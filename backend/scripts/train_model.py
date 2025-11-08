import os
import pandas as pd
import numpy as np
import joblib
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split, StratifiedKFold
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score, roc_curve, precision_recall_curve
from imblearn.over_sampling import SMOTE
from xgboost import XGBClassifier
from skopt import BayesSearchCV

def train_xgboost(csv_file="data/processed/landslide_features_processed.csv",
                  out_path="models/xgb_model.pkl"):

    # Load
    df = pd.read_csv(csv_file)
    df = df.drop(columns=[".geo", "system:index"], errors="ignore")

    if "label" not in df.columns:
        raise ValueError("❌ 'label' column missing in dataset")

    X = df.drop(columns=["label"]).select_dtypes(include=[np.number])
    y = df["label"]
    print(f"✅ Loaded {len(df)} samples, {y.sum()} landslides")

    # Feature engineering
    if "aspect" in X.columns:
        X["sin_aspect"] = np.sin(np.deg2rad(X["aspect"]))
        X["cos_aspect"] = np.cos(np.deg2rad(X["aspect"]))
    if "slope" in X.columns:
        X["slope_sq"] = X["slope"] ** 2
    if set(["slope", "elevation"]).issubset(X.columns):
        X["elev_slope"] = X["elevation"] * X["slope"]

    # Train/test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # SMOTE for balance
    sm = SMOTE(random_state=42)
    X_train, y_train = sm.fit_resample(X_train, y_train)
    print("SMOTE:", np.bincount(y_train))

    # Define XGBoost model
    xgb = XGBClassifier(
        objective="binary:logistic",
        eval_metric="auc",
        use_label_encoder=False,
        n_jobs=-1
    )

    # Hyperparameter search space
    search_space = {
        "learning_rate": (0.01, 0.3, "log-uniform"),
        "max_depth": (3, 12),
        "min_child_weight": (1, 10),
        "subsample": (0.5, 1.0, "uniform"),
        "colsample_bytree": (0.5, 1.0, "uniform"),
        "gamma": (0, 10),
        "n_estimators": (200, 600),
        "scale_pos_weight": (1, 15)  # handles imbalance
    }

    bayes_cv = BayesSearchCV(
        xgb,
        search_spaces=search_space,
        scoring="f1_weighted",
        cv=StratifiedKFold(n_splits=3, shuffle=True, random_state=42),
        n_iter=32,
        random_state=42,
        n_jobs=-1,
        verbose=1
    )

    # Train
    bayes_cv.fit(X_train, y_train)
    print("🏆 Best Params:", bayes_cv.best_params_)

    best_model = bayes_cv.best_estimator_

    # Evaluate
    y_pred = best_model.predict(X_test)
    y_prob = best_model.predict_proba(X_test)[:, 1]

    print("\n📈 Classification Report:")
    print(classification_report(y_test, y_pred, zero_division=0))
    print("🔍 Confusion Matrix:")
    print(confusion_matrix(y_test, y_pred))
    print(f"ROC-AUC: {roc_auc_score(y_test, y_prob):.3f}")

    # ROC Curve
    fpr, tpr, _ = roc_curve(y_test, y_prob)
    plt.figure(figsize=(6, 5))
    plt.plot(fpr, tpr, label=f"AUC = {roc_auc_score(y_test, y_prob):.3f}")
    plt.plot([0, 1], [0, 1], "k--")
    plt.xlabel("False Positive Rate")
    plt.ylabel("True Positive Rate")
    plt.title("ROC Curve - XGBoost Landslide Model")
    plt.legend()
    plt.show()

    # Precision-Recall Curve
    prec, rec, _ = precision_recall_curve(y_test, y_prob)
    plt.figure(figsize=(6, 5))
    plt.plot(rec, prec)
    plt.xlabel("Recall")
    plt.ylabel("Precision")
    plt.title("Precision-Recall Curve")
    plt.show()

    # Save model
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    joblib.dump(best_model, out_path)
    print(f"✅ Model saved to {out_path}")

if __name__ == "__main__":
    train_xgboost()
