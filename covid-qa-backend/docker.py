def cache_models():
    """
    Small function that caches models and other data.
    Used only in the Dockerfile to include these caches in the images.
    """
    # download punkt tokenizer


    # Cache roberta-base-squad2 model
    import transformers
    model_name_or_path_reranker = "chiendvhust/cross-encoder-distilroberta-base"
    model_name_or_path_reader = "chiendvhust/biobert_v1.1_pubmed_squad_v2-finetuned-covidQA"
    # model_to_cache='deepset/roberta-base-squad2'
    transformers.AutoTokenizer.from_pretrained(model_name_or_path_reranker)
    transformers.AutoModel.from_pretrained(model_name_or_path_reranker)
    transformers.AutoTokenizer.from_pretrained(model_name_or_path_reader)
    transformers.AutoModel.from_pretrained(model_name_or_path_reader)