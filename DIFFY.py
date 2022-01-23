from PIL import Image
import imagehash
from BW import background_white


def calculate_diff(image1, image2):

    image2 = image2.resize((24, 24))
    image1 = image1.resize((24, 24))

    hash1 = imagehash.average_hash(image1) 
    hash2 = imagehash.average_hash(image2)
    
    cutoff = 10  # maximum bits that could be different between the hashes.

    return (hash1-hash2)


ape1 = Image.open("pics/pic5.png")
ape2 = Image.open("pics/pic6.jpeg")

"""background_white(ape1)
background_white(ape2)"""

print(calculate_diff(ape1, ape2))