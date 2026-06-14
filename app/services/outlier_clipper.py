import numpy as np
import pandas as pd

from sklearn.base import BaseEstimator, TransformerMixin


class OutlierClipper(BaseEstimator, TransformerMixin):

    def fit(self, X, y=None):

        self.lower_bounds_ = []
        self.upper_bounds_ = []

        for j in range(X.shape[1]):

            col = pd.Series(X[:, j]).astype(float)

            q1 = col.quantile(0.25)
            q3 = col.quantile(0.75)

            iqr = q3 - q1

            lower = q1 - 1.5 * iqr
            upper = q3 + 1.5 * iqr

            self.lower_bounds_.append(lower)
            self.upper_bounds_.append(upper)

        return self

    def transform(self, X, y=None):

        X = X.copy().astype(float)

        for j in range(X.shape[1]):
            X[:, j] = np.clip(
                X[:, j],
                self.lower_bounds_[j],
                self.upper_bounds_[j]
            )

        return X