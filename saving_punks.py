from PIL import Image
import imagehash
from BW import background_white

# saving 10.000 punks from the official Cryptopunks collection.

punks = Image.open("pics/punks.png")

background_white(punks)

counter = 0

for i in range(100):
    for j in range(100):
        coords = (24*i, 24*j, 24+24*i, 24+24*j)
        punks.crop(coords).save("punks/punk"+str(counter)+".png")
        counter += 1

