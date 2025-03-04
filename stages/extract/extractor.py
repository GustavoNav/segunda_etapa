import pandas as pd

class Extractor:

    def extract(self, path: str):
        raw_data = pd.read_csv(path, index_col=0)

        return raw_data
