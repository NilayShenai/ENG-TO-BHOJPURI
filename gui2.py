# Import Modules
from tkinter import *
import torch
from transformers import MBartForConditionalGeneration, MBart50TokenizerFast

# Load translation model
model_name = "nilayshenai/BART-English-to-Bhojpuri-Alpha1"
tokenizer = MBart50TokenizerFast.from_pretrained(model_name)
model = MBartForConditionalGeneration.from_pretrained(model_name)

# Setup device (MPS for M1/M2 Mac)
if torch.backends.mps.is_available():
    device = torch.device("mps")
else:
    device = torch.device("cpu")
model.to(device)

# Translation function
def translate(text):
    tokenizer.src_lang = "en_XX"
    tgt_lang_code = tokenizer.lang_code_to_id["hi_IN"]
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=128)
    inputs = {k: v.to(device) for k, v in inputs.items()}
    outputs = model.generate(
        **inputs,
        forced_bos_token_id=tgt_lang_code,
        max_length=128,
        num_beams=5
    )
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

# Create the Tkinter Window
root = Tk()
root.geometry('1100x500')
root.resizable(False, False)
root.config(bg='#f0f2f5')
root.title('English ➔ Bhojpuri Translator')

# Heading
Label(root, text='English ➔ Bhojpuri Translator', fg="#1A73E8", bg="#f0f2f5", font="Helvetica 20 bold").pack(pady=10)

# Create Input Text Widget
Label(root, text="Enter English Text", font='Helvetica 13 bold', bg='#f0f2f5', fg="#333333").place(x=80, y=70)
Input_text = Text(root, font='Helvetica 12', height=8, wrap=WORD, padx=10, pady=10, width=45, bg="white", fg="black", relief=SOLID, bd=1)
Input_text.place(x=50, y=100)

# Create Output Text Widget
Label(root, text="Bhojpuri Translation", font='Helvetica 13 bold', bg='#f0f2f5', fg="#333333").place(x=680, y=70)
Output_text = Text(root, font='Helvetica 12', height=8, wrap=WORD, padx=10, pady=10, width=45, bg="white", fg="black", relief=SOLID, bd=1)
Output_text.place(x=650, y=100)

# Functions for Translate and Clear
def Translate():
    txt = Input_text.get("1.0", END).strip()
    if txt:
        Output_text.delete(1.0, END)
        Output_text.insert(END, translate(txt))

def Clear():
    Input_text.delete(1.0, END)
    Output_text.delete(1.0, END)

# Buttons
trans_btn = Button(root, text='Translate', command=Translate, font='Helvetica 12 bold', pady=5, padx=20,
                   bg='#1A73E8', fg='white', activebackground='#1558b0', activeforeground='white', relief=FLAT)
trans_btn.place(x=350, y=350)

clear_btn = Button(root, text="Clear", command=Clear, font='Helvetica 12 bold', pady=5, padx=20,
                   bg='#EA4335', fg='white', activebackground='#c3261a', activeforeground='white', relief=FLAT)
clear_btn.place(x=500, y=350)

# Footer
Label(root, text="Powered by mBART - Nilay Shenai", font="Helvetica 10", bg="#f0f2f5", fg="#666666").pack(side=BOTTOM, pady=10)

root.mainloop()
