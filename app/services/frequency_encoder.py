import numpy as np
import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin


class FrequencyEncoder(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None):
        self.maps_ = []

        for j in range(X.shape[1]):
            col = pd.Series(X[:, j]).fillna('desconhecido').astype(str)
            freq = col.value_counts()
            self.maps_.append(
                {val: rank for rank, val in enumerate(freq.index)}
            )

        return self

    def transform(self, X, y=None):
        result = np.zeros((X.shape[0], X.shape[1]))

        for j in range(X.shape[1]):
            col = pd.Series(X[:, j]).fillna('desconhecido').astype(str)

            result[:, j] = (
                col.map(self.maps_[j])
                .fillna(len(self.maps_[j]))
            )

        return result