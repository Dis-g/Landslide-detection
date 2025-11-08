var aoi = ee.Geometry.Rectangle([84.5, 27.6, 85.5, 28.5]);  // Example: central Nepal
Map.centerObject(aoi, 8);

// ========== 2️⃣ DEM and Terrain Derivatives ==========
var dem = ee.Image("USGS/SRTMGL1_003").clip(aoi);
var slope = ee.Terrain.slope(dem);
var aspect = ee.Terrain.aspect(dem);
var elevation = dem.select("elevation");

// --- Curvature (Plan & Profile) ---
var planCurv = dem.convolve(ee.Kernel.laplacian8(1)).rename("plan_curv");
var profCurv = slope.convolve(ee.Kernel.laplacian8(1)).rename("prof_curv");

// --- Flow accumulation (for TWI) ---
var filled = dem.focal_mean(3, "square", "pixels"); // fill small sinks
var flowDir = ee.Terrain.aspect(filled).multiply(Math.PI / 180.0); // radians
var tanSlope = slope.divide(180).multiply(Math.PI).tan(); // slope in radians
var flowAccum = ee.Image("WWF/HydroSHEDS/15ACC").clip(aoi); // global flow accumulation map

// --- Compute Topographic Wetness Index (TWI = ln(As / tan(slope))) ---
var twi = flowAccum.add(1).log().subtract(tanSlope.log()).rename("TWI");

// ========== 3️⃣ Sentinel-2 Spectral Indices ==========
var s2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(aoi)
  .filterDate("2020-01-01", "2023-12-31")
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10))
  .median()
  .clip(aoi);

var ndvi = s2.normalizedDifference(["B8", "B4"]).rename("NDVI");
var ndwi = s2.normalizedDifference(["B3", "B8"]).rename("NDWI");
var ndmi = s2.normalizedDifference(["B8", "B11"]).rename("NDMI");

// Combine all features
var featureStack = s2.select(["B2", "B3", "B4", "B8"])
  .addBands([elevation, slope, aspect, ndvi, ndwi, ndmi, twi, planCurv, profCurv])
  .clip(aoi);

// ========== 4️⃣ Landslide Catalog ==========
var landslides = ee.FeatureCollection("projects/sat-io/open-datasets/events/global_landslide_1970-2019")
  .filterBounds(aoi);

print("✅ Landslides found:", landslides.size());
Map.addLayer(landslides, {color: "red"}, "Landslides");

// ========== 5️⃣ Generate labeled points ==========
var landslidePoints = landslides.map(function(f) {
  return f.set("label", 1);
});

var bufferDist = 500; // avoid nearby points
var landslideBuffer = landslides.map(function(f) { return f.buffer(bufferDist); });
var nonLandslideArea = aoi.difference(landslideBuffer.union(), 10);

var nonLandslidePoints = ee.FeatureCollection.randomPoints({
  region: nonLandslideArea,
  points: 1000,
  seed: 42
}).map(function(f) { return f.set("label", 0); });

var samples = landslidePoints.merge(nonLandslidePoints);
print("✅ Total samples:", samples.size());
Map.addLayer(nonLandslidePoints, {color: "blue"}, "Non-Landslides");
Map.addLayer(samples, {}, "All Samples");

// ========== 6️⃣ Sample the Feature Stack ==========
var training = featureStack.sampleRegions({
  collection: samples,
  properties: ["label"],
  scale: 30,
  geometries: true
});

print("✅ Final sample count:", training.size());
print("Sample structure:", training.first());

// ========== 7️⃣ Export to Google Drive ==========
Export.table.toDrive({
  collection: training,
  description: "Landslide_Feature_Export_Enhanced",
  folder: "GEE_Exports",
  fileNamePrefix: "landslide_feature_export_enhanced",
  fileFormat: "CSV"
});

// Visualization
Map.addLayer(elevation, {min: 0, max: 4000, palette: ["blue", "green", "brown", "white"]}, "Elevation");
Map.addLayer(slope, {min: 0, max: 60, palette: ["white", "yellow", "red"]}, "Slope");
Map.addLayer(twi, {min: 3, max: 20, palette: ["white", "cyan", "blue"]}, "TWI");
Map.addLayer(ndvi, {min: -0.2, max: 0.8, palette: ["white", "green"]}, "NDVI");
print("🚀 Export task created! Check the Tasks tab to start export.");
