from setuptools import setup

setup(
    name='gitscribe',
    version='0.1.0',
    packages=['gitscribe'],
    entry_points={
        'console_scripts': ['gitscribe=gitscribe.main:main']
    },
    install_requires=[
        'argparse',
        'openai',
        'python-dotenv',
        'setuptools'
    ],
    description='A tool to generate commit messages using OpenAI models.',
    author='Author',
    python_requires='>=3.12'
)