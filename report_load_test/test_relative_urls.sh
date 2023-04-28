#!/bin/bash

base_url="http://localhost:3001"

GREEN='\033[0;32m'
RED='\033[0;31m'
RESET='\033[0m'

output_file="./report_load_test/tested_urls.txt"

> "${output_file}"

while read -r line; do
  relative_url=$(echo "${line}" | awk '{print $1}')

  if [ -z "${relative_url}" ]; then
    continue
  fi

  full_url="${base_url}${relative_url}"

  echo "Testing URL: ${full_url}"
  # Make a request to the full URL and store the HTTP status code
  http_status_code=$(curl -o /dev/null -s -w "%{http_code}" "${full_url}")

  # Check if the HTTP status code is 200 (OK)
  if [ "${http_status_code}" == "200" ]; then
    result="${GREEN}SUCCESS: ${full_url} returned a 200 status code.${RESET}"
    # Save the successful URL to the output file
    echo "${full_url}" >> "${output_file}"
  else
    result="${RED}FAILED: ${full_url} returned a ${http_status_code} status code.${RESET}"
  fi

  echo -e "${result}"
done < ./report_load_test/relative_urls.txt
