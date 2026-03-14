import os
from client import client

def get_file_summary(file1, file2):
    """
    Get the summary of changes between a file in two different commits.

    Args:
        file1 (str): The name of the first version of the file.
        file2 (str): The name of the second version of the file.
    Returns:
        str: The summary of changes for the specified file.
    """
    
    BASE_DIR = os.path.dirname(os.getcwd())

    file1_path = os.path.join(BASE_DIR, 'data', 'test1.py')
    file2_path = os.path.join(BASE_DIR, 'data', 'test2.py')
    
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

    print(response.choices[0].message.content)