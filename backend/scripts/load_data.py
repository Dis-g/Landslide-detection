import rasterio
import numpy as np

def tiftopython():
    with rasterio.open('../dataset/Darjeeling_Elevation.tif') as src:
        elevation = src.read(1)

    print(elevation.shape)

    with rasterio.open('../dataset/Darjeeling_Slope.tif') as src:
        slope = src.read(1)

    print(slope.shape)
    return elevation, slope