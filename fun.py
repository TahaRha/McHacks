from PIL import Image
import imagehash
from BW import background_white
from DIFFY import calculate_diff
import random

def mix(image1, image2):

    image2.resize((24, 24))
    image1.resize((24, 24))

    background_white(image1)
    background_white(image2)

    mixed = Image.new("RGB", ((24, 24)))

    width, height = mixed.size

    for x in range(width):
        for y in range(height):
            if random.randint(1, 2) == 1:
                chosen_color = image1.getpixel((x, y))
            else:
                chosen_color = image2.getpixel((x, y))

            mixed.putpixel((x, y), chosen_color)

    return mixed


for i in range(0, 30):
    j = random.randint(0, 29)
    k = random.randint(0, 29)

    punk1 = Image.open("punks/punk"+str(j)+".png")
    punk2 = Image.open("punks/punk"+str(k)+".png")

    mutant = mix(punk1, punk2)

    mutant.save("mutant-punks/mutant"+str(i)+".png")





