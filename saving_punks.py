from PIL import Image
import imagehash
from BW import background_white

punks = Image.open("pics/punks.png")

background_white(punks)

for i in range(30):
    coords = (24*i, 0, 24+24*i, 24)
    punks.crop(coords).save("punks/punk"+str(i)+".png")

