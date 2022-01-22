from PIL import Image
import imagehash
from BW import background_white


def calculate_diff(im1path, im2path):
    image0 = Image.open(im1path)
    image1 = Image.open(im2path)

    image1.resize((64, 64))
    image0.resize((64, 64))

    background_white(image1)
    background_white(image0)

    hash0 = imagehash.average_hash(image0) 
    hash1 = imagehash.average_hash(image1)
    cutoff = 10  # maximum bits that could be different between the hashes.

    print(hash0, hash1)
    return (hash0-hash1)


for i in range(20):
    avg += 
