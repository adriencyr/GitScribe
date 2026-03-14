import os
from gitscribe.client import client

def generate_file_summary(file1, file2):
    """
    Generate a summary of changes between a file in two different commits.

    Args:
        file1 (str): The name of the first version of the file.
        file2 (str): The name of the second version of the file.
    Returns:
        str: The summary of changes for the specified file.
    """
    
    BASE_DIR = os.path.dirname(os.path.dirname(__file__))

    file1_path = os.path.join(BASE_DIR, 'data', file1)
    file2_path = os.path.join(BASE_DIR, 'data', file2)
    
    file1_content = open(file1_path, 'r').read()
    file2_content = open(file2_path, 'r').read()
    
    print(f"Getting summary for {file1} and {file2}...")
    
    response = client.chat.completions.create(
        model="gpt-4o-mini", 
        messages=[
            {"role": "system", "content": f"You are a helpful coding assistant summarizing the differences between the two versions of this file."},
            {"role": "user", "content": f"Summarize the differences between {file1} and {file2}.\n\n{file1}:\n{file1_content}\n\n{file2}:\n{file2_content}"}
        ]
    )

    return response.choices[0].message.content