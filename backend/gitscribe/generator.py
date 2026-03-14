import os
from gitscribe.client import client
from gitscribe.git_utils import generate_file_summary

def generate_file_commit_message(msgs, file1, file2):
    """
    Generate a commit message based on the changes between two versions of a file.

    Args:
        msgs (int): The number of messages to generate.
        file1 (str): The name of the first version of the file.
        file2 (str): The name of the second version of the file.
    Returns:
        str: The generated commit message.
    """
    
    parent_folder = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    summary_path = os.path.join(parent_folder, "data", "summary.txt")
    summary = open(summary_path, "r").read()
    # summary = generate_file_summary(file1, file2)

    response = client.chat.completions.create(
        model="gpt-4o-mini", 
        messages=[
            {"role": "system", "content": f"You are a helpful coding assistant generating a concise commit message based on the following summary of changes:\n\n{summary}"},
            {"role": "user", "content": f"Generate {msgs} concise commit message{(msgs > 1 and 's' or '')} based on the above summary. Only output the exact message without any additional text or formatting. {(msgs > 1 and 'Separate each message with a comma.' or '')}"}
        ]
    )

    return response.choices[0].message.content.strip()