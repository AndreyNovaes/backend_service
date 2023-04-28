import sys
import pandas as pd
from jinja2 import Environment, FileSystemLoader

def process_csv_results(file_name):
    df = pd.read_csv(file_name, delimiter=',')

    good_requests = len(df[df['Milliseconds'].astype(float) <= 2000])
    bad_requests = len(df[df['Milliseconds'].astype(float) > 2000])

    total_requests = len(df)
    good_percent = round((good_requests / total_requests) * 100, 2)
    bad_percent = round((bad_requests / total_requests) * 100, 2)

    return df, good_percent, bad_percent

def render_template(template_file, **kwargs):
    env = Environment(loader=FileSystemLoader('.'))
    template = env.get_template(template_file)
    return template.render(**kwargs)

def main():
    if len(sys.argv) != 3:
        print("Usage: python generate_report.py <input_csv> <output_html>")
        sys.exit(1)

    csv_file = sys.argv[1]
    output_file = sys.argv[2]

    df, good_percentile, bad_percentile = process_csv_results(csv_file)

    data = df.to_dict('records')
    concurrent_users = 10000
    num_requests = 100000
    seconds = 60

    with open(output_file, "w") as f:
        f.write(render_template("./report_load_test/report_template.html", good_percentile=good_percentile, bad_percentile=bad_percentile, data=data, concurrent_users=concurrent_users, num_requests=num_requests, seconds=seconds))

if __name__ == "__main__":
    main()
