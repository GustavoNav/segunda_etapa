import pandas as pd
from errors.extract_error import ExtractError

class Extractor:

    def extract(self, path: str) -> pd.DataFrame:
        try:
            raw_data = pd.read_csv(path)
        except Exception as exception:
            raise ExtractError(str(exception))
        
        return raw_data
