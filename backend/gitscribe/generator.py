from gitscribe.client import get_client
from gitscribe.git_utils import generate_summary_from_file, generate_summary_from_text


def generate_commit_message_from_summary(msgs, summary):
    """
    Generate commit message suggestions from a summary of code changes.

    Args:
        msgs (int): The number of commit messages to generate.
        summary (str): A summary describing the code changes.

    Returns:
        list[str]: A list of generated commit messages.
    """
    client = get_client()
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a helpful coding assistant generating concise commit messages that follow the Conventional Commits format."
                ),
            },
            {
                "role": "user",
                "content": f"""
                    Summary of changes:
                    {summary}

                    Generate {msgs} concise commit message{"s" if msgs > 1 else ""} based on the summary above.

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
                    """,
            },
        ],
    )

    content = response.choices[0].message.content
    return [msg.strip() for msg in content.splitlines() if msg.strip()]


def generate_commit_message_from_file(msgs, file1, file2):
    """
    Generate commit message suggestions from two file names.

    Args:
        msgs (int): The number of commit messages to generate.
        file1 (str): The filename of the first version of the file.
        file2 (str): The filename of the second version of the file.

    Returns:
        list[str]: A list of generated commit messages.
    """
    
    summary = generate_summary_from_file(file1, file2)
    return generate_commit_message_from_summary(msgs, summary)


def generate_commit_message_from_text(msgs, text1, text2):
    """
    Generate commit message suggestions from two raw code strings.

    Args:
        msgs (int): The number of commit messages to generate.
        text1 (str): The contents of the first version of the code.
        text2 (str): The contents of the second version of the code.

    Returns:
        list[str]: A list of generated commit messages.
    """
    
    summary = generate_summary_from_text(text1, text2)
    return generate_commit_message_from_summary(msgs, summary)