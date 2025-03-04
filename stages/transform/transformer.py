import pandas as pd

class Transformer:

    def transform(self, raw_data: pd.DataFrame):
        transformed_data = self.__convert_date(raw_data)
        transformed_data = self.__calculate_total_sales(transformed_data)

        return transformed_data
        
    def __convert_date(self, data: pd.DataFrame):
        transformed_data = data.copy()
        transformed_data["data_venda"] = pd.to_datetime(transformed_data["data_venda"], format="%d/%m/%Y")
        transformed_data["data_venda"] = transformed_data["data_venda"].dt.strftime("%Y/%m/%d")

        return transformed_data

    def __calculate_total_sales(self, data: pd.DataFrame):
        transformed_data = data.copy()
        transformed_data["total_vendas"] = transformed_data["quantidade"] * transformed_data["preco_unitario"]

        return transformed_data

    def __remove_nulls():
        pass

