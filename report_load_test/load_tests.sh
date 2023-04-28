#!/bin/bash

echo "Testing Urls:"
bash ./report_load_test/test_relative_urls.sh

echo "is apache benchmark installed?"
if ! command -v ab &> /dev/null; then
  echo "apache benchmark is not installed. can i install it?"
  read -p "Install apache benchmark? (y/n) " -n 1 -r
  echo -e "\n"
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Installing apache benchmark..."
    sudo apt-get install apache2-utils
  else
    echo "Skipping apache benchmark installation..."
  fi
fi

echo "Starting load test: 100000 requests with 10000 concurrent in 60 seconds..."
export CONCURRENT_USERS=10000
export NUM_REQUESTS=100000

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
