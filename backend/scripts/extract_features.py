import os
import pandas as pd
import numpy as np
from skimage.feature import graycomatrix, graycoprops

# Helper: Compute texture features from an array (e.g., NDVI)
def compute_texture(array, distances=[1], angles=[0], props=['contrast', 'homogeneity']):
    """
    Computes GLCM texture metrics for a given array.
    """
    array = np.nan_to_num(array)
    array = np.clip(array, 0, 1)  # NDVI, NDWI usually range between -1 and 1
    array = ((array - array.min()) / (array.max() - array.min() + 1e-6) * 255).astype(np.uint8)

    # reshape to nearest square matrix
    n = int(np.sqrt(array.size))
    array = array[: n * n].reshape((n, n))

    glcm = graycomatrix(array, distances=distances, angles=angles, symmetric=True, normed=True)
    texture = {}
    for prop in props:
        texture[prop] = graycoprops(glcm, prop)[0, 0]
    return texture

# Helper: Normalize numerical columns
def normalize(df, cols):
    for c in cols:
        if c in df.columns:
            df[c] = (df[c] - df[c].min()) / (df[c].max() - df[c].min() + 1e-6)
    return df

# Main processing function
def process_features(
    input_csv="data/raw/landslide_feature_export_enhanced.csv",
    out_csv="data/processed/landslide_features_processed.csv",
):
    os.makedirs(os.path.dirname(out_csv), exist_ok=True)
    df = pd.read_csv(input_csv)

    # Drop unused geometry/index columns
    df = df.drop(columns=[".geo", "system:index"], errors="ignore")

    # Drop incomplete rows
    df = df.dropna(subset=["NDVI", "NDWI", "elevation", "slope", "aspect"])

    # Select available features based on your dataset
    all_features = ["NDVI", "NDWI", "NDMI", "slope", "aspect", "elevation"]
    available_features = [f for f in all_features if f in df.columns]
    print(f"✅ Found available features: {available_features}")

    # Normalize them
    df = normalize(df, available_features)

    # Compute texture metrics from NDVI (if present)
    if "NDVI" in df.columns:
        texture_vals = compute_texture(df["NDVI"].values)
        for k, v in texture_vals.items():
            df[f"NDVI_{k}"] = v
        print(f"🌀 Added NDVI texture metrics: {list(texture_vals.keys())}")

    # Derived ratios (if columns exist)
    if all(col in df.columns for col in ["slope", "aspect"]):
        df["slope_aspect_ratio"] = df["slope"] / (df["aspect"] + 1e-3)
    if all(col in df.columns for col in ["elevation", "NDVI"]):
        df["elev_ndvi_ratio"] = df["elevation"] / (df["NDVI"] + 1e-3)

    # Save output
    df.to_csv(out_csv, index=False)
    print(f"✅ Processed features saved to {out_csv} ({len(df)} samples)")

# Entry Point
if __name__ == "__main__":
    process_features()
