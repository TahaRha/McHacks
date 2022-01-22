from PIL import Image
import imagehash
from BW import background_white
from DIFFY import calculate_diff
import matplotlib as plt

image = Image.open("pics/pic5.png")
background_white(image)

avg = 0

for i in range(30):
    compPunk = Image.open("punks/punk"+str(i)+".png")
    avg += calculate_diff(image, compPunk)

avg = avg/30

print(avg)
