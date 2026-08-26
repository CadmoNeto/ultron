import logging

def setup_log(log_level):
    logging.basicConfig(level=log_level, format='%(asctime)s | %(name)s | %(levelname)s | %(message)s')