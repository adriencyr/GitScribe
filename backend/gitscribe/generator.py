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
    
    summary = generate_file_summary(file1, file2)
    print(summary)

    response = client.chat.completions.create(
        model="gpt-4o-mini", 
        messages=[
            {"role": "system", "content": f"You are a helpful coding assistant generating a concise commit message following the conventional commit format based on the following summary of changes:\n\n{summary}"},
            {
                "role": "user", 
                "content": f"""
                    Generate {msgs} concise commit message{(msgs > 1 and 's' or '')} based on the above summary. 
                    
                    Rules: 
                    - Maximum 50 characters per message.
                    - Start each message with a verb in the present tense (e.g., 'fix', 'add', 'update').
                    - Only output the exact message without any additional text or formatting. NO numbering, NO bullets, and NO added explanations.
                    - Follow the conventional commit format: <type>(<scope>): <description>. 
                    - Ensure to utilize the correct type (feat, fix, docs, style, refactor, test, chore) and scope based on the changes described in the summary.
                    - The feat type is for new features of the code.
                    - The fix type is for bug fixes within the code.
                    - The docs type is for documentation changes.
                    - The style type is purely for code formatting (e.g., indentation, spacing).
                    - Use style only for source code formatting changes, such as indentation, whitespace, line breaks, semicolons, or quote style, where program behavior and output do not change.
                    - If the change modifies user-facing strings, printed text, displayed text, logs, labels, capitalization, wording, or punctuation in program output, use fix instead of style.
                    - The refactor type is for code changes that neither fix a bug nor add a feature.
                    - The test type is for adding or updating tests.
                    - The chore type is for maintenance tasks.
                    - Use a meaningful scope that indicates the area of the codebase affected by the changes (e.g., parser, database, UI).
                    {"- Output each message on a separate line." if msgs > 1 else ""}
                    """
             }
        ]
    )
    
    output = [msg.strip() for msg in response.choices[0].message.content.splitlines() if msg.strip()]
    print(output)
    return output