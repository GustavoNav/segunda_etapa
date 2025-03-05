import pandas as pd
from errors.transform_error import TransformError

class Transformer:

    def transform(self, raw_data: pd.DataFrame) -> pd.DataFrame:
        try:
            transformed_data = self.__convert_date(raw_data)
            transformed_data = self.__calculate_total_sales(transformed_data)
            transformed_data = self.__remove_nulls(transformed_data)
        except Exception as exception:
            raise TransformError(str(exception))

        return transformed_data
        
    def __convert_date(self, data: pd.DataFrame) -> pd.DataFrame:
        transformed_data = data.copy()
        transformed_data["data_venda"] = pd.to_datetime(transformed_data["data_venda"], format="%d/%m/%Y")
        transformed_data["data_venda"] = transformed_data["data_venda"].dt.strftime("%Y/%m/%d")

        return transformed_data

    def __calculate_total_sales(self, data: pd.DataFrame) -> pd.DataFrame:
        transformed_data = data.copy()
        transformed_data["total_vendas"] = round(transformed_data["quantidade"] * transformed_data["preco_unitario"], 2)

        return transformed_data

    def __remove_nulls(self, data: pd.DataFrame) -> pd.DataFrame:
        transformed_data = data.copy()
        transformed_data = transformed_data.dropna()

        return transformed_data
