from pathlib import Path
from gitscribe.client import client

def generate_summary(content1, content2, label1="file1", label2="file2"):
    """
    Generate a summary of changes between two versions of code.

    Args:
        content1 (str): The contents of the first version of the code.
        content2 (str): The contents of the second version of the code.
        label1 (str): A label for the first version in the prompt.
        label2 (str): A label for the second version in the prompt.

    Returns:
        str: A summary of the changes.
    """
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful coding assistant summarizing the differences between two versions of a file."
            },
            {
                "role": "user",
                "content": (
                    f"Summarize the differences between {label1} and {label2}.\n\n"
                    f"{label1}:\n{content1}\n\n"
                    f"{label2}:\n{content2}"
                )
            }
        ]
    )

    return response.choices[0].message.content


def generate_summary_from_file(file1, file2):
    """
    Wrapper around generate_summary() to generate a summary from two file names in the local data directory.
    
    Args:
        file1 (str): The filename of the first version of the file.
        file2 (str): The filename of the second version of the file.

    Returns:
        str: A summary describing the differences between the two files.
    """
    base_dir = Path(__file__).resolve().parents[1]
    data_dir = base_dir / "data"

    file1_path = data_dir / file1
    file2_path = data_dir / file2

    file1_content = file1_path.read_text(encoding="utf-8")
    file2_content = file2_path.read_text(encoding="utf-8")

    return generate_summary(file1_content, file2_content, file1, file2)


def generate_summary_from_text(file1_content, file2_content):
    """
    Wrapper around generate_summary() to generate a summary directly from raw code strings.
    
    Args:
        file1_content (str): The contents of the first version of the code.
        file2_content (str): The contents of the second version of the code.

    Returns:
        str: A summary describing the differences between the two versions.
    """
    
    return generate_summary(file1_content, file2_content)