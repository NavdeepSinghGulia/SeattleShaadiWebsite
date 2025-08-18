#!/bin/bash

# Create directories for each tradition
mkdir -p ./public/images/traditions/hindu
mkdir -p ./public/images/traditions/sikh
mkdir -p ./public/images/traditions/muslim
mkdir -p ./public/images/traditions/tamil
mkdir -p ./public/images/traditions/telugu
mkdir -p ./public/images/traditions/kannada
mkdir -p ./public/images/traditions/malayalam

# Hindu traditions
wget -O ./public/images/traditions/hindu/haldi-ceremony.jpg "https://img.freepik.com/free-photo/indian-wedding-ritual-where-turmeric-paste-is-applied-bride-groom_8353-9794.jpg"
wget -O ./public/images/traditions/hindu/mehndi-ceremony.jpg "https://img.freepik.com/free-photo/close-up-bride-getting-henna-tattoo-applied-her-hands_8353-10036.jpg"
wget -O ./public/images/traditions/hindu/sangeet-ceremony.jpg "https://img.freepik.com/free-photo/indian-wedding-dance-celebration-with-colorful-traditional-outfits_8353-9989.jpg"
wget -O ./public/images/traditions/hindu/baraat-ceremony.jpg "https://img.freepik.com/free-photo/groom-arriving-wedding-ceremony-horse-with-family-dancing_8353-9748.jpg"
wget -O ./public/images/traditions/hindu/jaimala-ceremony.jpg "https://img.freepik.com/free-photo/bride-groom-exchanging-flower-garlands-during-indian-wedding-ceremony_8353-9776.jpg"
wget -O ./public/images/traditions/hindu/pheras-ceremony.jpg "https://img.freepik.com/free-photo/bride-groom-taking-seven-steps-around-sacred-fire-hindu-wedding_8353-9782.jpg"
wget -O ./public/images/traditions/hindu/vidaai-ceremony.jpg "https://img.freepik.com/free-photo/emotional-farewell-bride-leaving-her-parental-home-after-wedding_8353-9803.jpg"

# Sikh traditions
wget -O ./public/images/traditions/sikh/jago-ceremony.jpg "https://img.freepik.com/free-photo/punjabi-wedding-celebration-with-decorated-pots-dancing_8353-10124.jpg"
wget -O ./public/images/traditions/sikh/mehndi-ceremony.jpg "https://img.freepik.com/free-photo/sikh-bride-getting-traditional-henna-designs-applied-hands_8353-10132.jpg"
wget -O ./public/images/traditions/sikh/choora-ceremony.jpg "https://img.freepik.com/free-photo/sikh-bride-wearing-traditional-red-white-bangles-choora-ceremony_8353-10139.jpg"
wget -O ./public/images/traditions/sikh/anand-karaj-ceremony.jpg "https://img.freepik.com/free-photo/sikh-wedding-ceremony-with-couple-circling-guru-granth-sahib_8353-10145.jpg"
wget -O ./public/images/traditions/sikh/milni-ceremony.jpg "https://img.freepik.com/free-photo/family-members-both-sides-meeting-exchanging-gifts-during-sikh-wedding_8353-10152.jpg"
wget -O ./public/images/traditions/sikh/laavan-ceremony.jpg "https://img.freepik.com/free-photo/sikh-couple-performing-four-laavan-pheras-around-guru-granth-sahib_8353-10159.jpg"

# Muslim traditions
wget -O ./public/images/traditions/muslim/nikah-ceremony.jpg "https://img.freepik.com/free-photo/muslim-wedding-ceremony-with-bride-groom-signing-marriage-contract_8353-10166.jpg"
wget -O ./public/images/traditions/muslim/mehndi-ceremony.jpg "https://img.freepik.com/free-photo/muslim-bride-with-intricate-geometric-henna-designs-hands_8353-10173.jpg"
wget -O ./public/images/traditions/muslim/walima-ceremony.jpg "https://img.freepik.com/free-photo/elegant-muslim-wedding-reception-with-traditional-decorations-food_8353-10180.jpg"

# Tamil traditions
wget -O ./public/images/traditions/tamil/oonjal-ceremony.jpg "https://img.freepik.com/free-photo/tamil-bride-groom-sitting-decorated-swing-during-oonjal-ceremony_8353-10187.jpg"
wget -O ./public/images/traditions/tamil/kanyadaanam-ceremony.jpg "https://img.freepik.com/free-photo/tamil-father-giving-away-bride-during-kanyadaanam-ceremony_8353-10194.jpg"
wget -O ./public/images/traditions/tamil/nalangu-ceremony.jpg "https://img.freepik.com/free-photo/playful-tamil-wedding-ritual-with-bride-groom-participating-games_8353-10201.jpg"

# Telugu traditions
wget -O ./public/images/traditions/telugu/talambralu-ceremony.jpg "https://img.freepik.com/free-photo/telugu-couple-showering-rice-flower-petals-over-each-other-during-talambralu_8353-10208.jpg"
wget -O ./public/images/traditions/telugu/jeelakarra-bellam-ceremony.jpg "https://img.freepik.com/free-photo/telugu-wedding-ritual-with-cumin-jaggery-paste-being-applied-heads_8353-10215.jpg"
wget -O ./public/images/traditions/telugu/arundhati-nakshatra-ceremony.jpg "https://img.freepik.com/free-photo/telugu-couple-looking-star-arundhati-during-wedding-ceremony_8353-10222.jpg"

# Kannada traditions
wget -O ./public/images/traditions/kannada/dhare-heralu-ceremony.jpg "https://img.freepik.com/free-photo/kannada-wedding-ritual-with-rice-being-poured-over-joined-hands_8353-10229.jpg"
wget -O ./public/images/traditions/kannada/kashi-yatra-ceremony.jpg "https://img.freepik.com/free-photo/kannada-groom-pretending-leave-pilgrimage-during-kashi-yatra-ceremony_8353-10236.jpg"
wget -O ./public/images/traditions/kannada/nalangu-ceremony.jpg "https://img.freepik.com/free-photo/kannada-bride-groom-playing-traditional-games-during-nalangu-ceremony_8353-10243.jpg"

# Malayalam traditions
wget -O ./public/images/traditions/malayalam/thalikettu-ceremony.jpg "https://img.freepik.com/free-photo/malayalam-wedding-with-groom-tying-thali-around-brides-neck_8353-10250.jpg"
wget -O ./public/images/traditions/malayalam/pudamuri-ceremony.jpg "https://img.freepik.com/free-photo/malayalam-wedding-ritual-with-groom-presenting-traditional-clothing-bride_8353-10257.jpg"

# Optimize images for web
find ./public/images/traditions -type f -name "*.jpg" -exec convert {} -strip -quality 85 -resize 800x600\> {} \;

echo "All images downloaded and optimized successfully!"

