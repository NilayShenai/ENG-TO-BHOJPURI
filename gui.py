# Import Modules
from translator import translator
from tkinter import *
from tkinter import ttk
# We use tkinter library to create a gui window where 
# we'll enter the text which we want to convert into voice.


root = Tk()
root.geometry('1000x400')
root.resizable(0,0)
root.config(bg = 'magenta')
root.title('ENG TO BHO*PURI')
Label(root, text = 'ENG TO Bhoj*uri', fg="blue", bg="grey", font="Helvetica 16 bold italic").pack()
Label(root, text = '  LIGMA BALLS  ', fg="light blue", bg="dark red", font="Helvetica 16 bold italic").pack(side = 'bottom')

# Create an Input-output text widget
# The above code creates two text widgets one for entering text and the other for displaying translated text.

Label(root,text ="Output", font = 'arial 13 bold', bg ='white smoke').place(x=485,y=60)
Output_text = Text(root,font = 'arial 10', height = 11, wrap = WORD, padx=5, pady= 5, width =50)
Output_text.place(x = 350 , y = 100)

# Define Function
# The Translate function will translate the message and give the output.
data = input()
def new():
	print("enter the text")
	input(data)
def Translate():
	txt = data
	trans = translator(txt)
	Output_text.delete(1.0, END)
	Output_text.insert(END, trans)
def Clear():                                                                           
	Output_text.delete(1.0, END)

# Create a translate & clear button

trans_btn = Button(root, text = 'Translate',command = Translate , font = 'arial 12 bold',pady = 5,bg = 'royal blue', activebackground = 'sky blue')
trans_btn.place(x = 100, y= 170 )
clear_btn = Button(root,text="Clear",command=Clear,font = 'arial 12 bold',pady = 5,bg = 'red', activebackground = 'red2')
clear_btn.place(x = 115, y= 210 )
root.mainloop()