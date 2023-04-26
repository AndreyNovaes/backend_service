#!/bin/bash

set -e

echo "Generating data from load test results..."
bash ./report_load_test/load_tests.sh

echo "Preparing virtual environment..."
python3 -m venv venv

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Generating report..."
python3 ./report_load_test/generate_report.py ./report_load_test/load_tests_results.csv ./report_load_test/report.html

echo "Deactivating virtual environment..."
deactivate
