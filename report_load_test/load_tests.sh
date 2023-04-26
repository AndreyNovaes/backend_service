#!/bin/bash

echo "Testing Urls:"
bash ./report_load_test/test_relative_urls.sh

echo "Load Testing Urls:"

echo "Starting load test: 1000 requests with 100 concurrent in 60 seconds..."
CONCURRENT_USERS=100
NUM_REQUESTS=1000

echo "URL,StartTime,Milliseconds" > ./report_load_test/load_tests_results.csv

while read -r url; do
  echo "Running load testing URL: $url"
  output_file="total_report_$RANDOM.txt"
  ab -n $NUM_REQUESTS -c $CONCURRENT_USERS -s 60 -r $url > $output_file
  echo -e "\n"

  starttime=$(date '+%Y-%m-%d %H:%M:%S')
  milliseconds=$(awk '/^Processing/ {print int($3)}' $output_file)
  echo "$url,$starttime,$milliseconds" >> ./report_load_test/load_tests_results.csv
  rm $output_file
done < ./report_load_test/tested_urls.txt
