import openai

openai.api_key = "your-api-key"

def analyze_code(diff: str):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You're a senior software engineer reviewing code."},
            {"role": "user", "content": f"Please review the following code diff:\n{diff}"}
        ]
    )
    return response["choices"][0]["message"]["content"]
