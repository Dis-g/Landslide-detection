import os
import torch
from torch.utils.data import Dataset, DataLoader
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

class LandslideDataset(Dataset):
    def __init__(self, csv_file='data/processed/features.csv', mode='tabular', transform=None):
        self.data = pd.read_csv(csv_file)
        self.transform = transform
        self.mode = mode

        # Split into features and labels
        self.labels = torch.tensor(self.data['label'].values, dtype=torch.float32)
        self.features = self.data.drop(columns=['label']).values

        if self.mode == 'tabular':
            self.features = torch.tensor(self.features, dtype=torch.float32)
        elif self.mode == 'cnn':
            # Reshape features into a small 2D patch (e.g., 3x3 or 5x5 grid)
            n_features = self.features.shape[1]
            side = int(np.ceil(np.sqrt(n_features)))
            padded = np.zeros((len(self.features), side*side))
            padded[:, :n_features] = self.features
            self.features = torch.tensor(padded.reshape(-1, 1, side, side), dtype=torch.float32)

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        x = self.features[idx]
        y = self.labels[idx]
        if self.transform:
            x = self.transform(x)
        return x, y


def create_dataloaders(csv_file='data/processed/features.csv', batch_size=64, mode='tabular', test_size=0.2):
    df = pd.read_csv(csv_file)
    train_df, test_df = train_test_split(df, test_size=test_size, stratify=df['label'], random_state=42)

    train_path = 'data/processed/train_temp.csv'
    test_path = 'data/processed/test_temp.csv'
    os.makedirs('data/processed', exist_ok=True)
    train_df.to_csv(train_path, index=False)
    test_df.to_csv(test_path, index=False)

    train_dataset = LandslideDataset(train_path, mode=mode)
    test_dataset = LandslideDataset(test_path, mode=mode)

    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)

    return train_loader, test_loader

if __name__ == '__main__':
    train_loader, test_loader = create_dataloaders()
    print(f"Train batches: {len(train_loader)}, Test batches: {len(test_loader)}")
