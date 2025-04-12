import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

def analyze_code(code):
    prompt = f"""You're a senior software engineer. Review the following code:\n\n{code}\n\nPlease assess:
1. Summary
2. Issues (if any)
3. Suggestions
4. Final Verdict: APPROVE or REQUEST CHANGES"""

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
    )

    content = response['choices'][0]['message']['content']
    verdict = "approve" if "APPROVE" in content.upper() else "request changes"
    return verdict, content
