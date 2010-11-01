require 'rubygems'

require 'hpricot'
require 'open-uri'
require 'json'

BIGEAT_2010_URL = "http://www.7x7.com/eat-drink/2010-big-eat-sf-100-things-try-you-die"
BIGEAT_2009_URL = "http://www.7x7.com/eat-drink/2009-big-eat-sf-100-things-try-you-die"
BIGSWEET_2010_URL = "http://www.7x7.com/eat-drink/big-sweet-sf-50-treats-eat-you-die"

def get_items_for_bigeat(url)

	json_array = []
	doc = open(url) { |f| Hpricot(f) }

	 doc.search("//p").each do |para|
	     para_text = para.to_plain_text

	     #Example - 75. Fried green beans at Coco500 [http://www.coco500.com/]
	     if(para_text =~ /(\d+). (.+) at (.+) \[(.+)\]/)
	     
	     	item_id = $1.to_i
	     	item_name = $2
	     	venue_name = $3
	     	venue_website = $4
	     	
		json_array << { 

			"item_id" => item_id, 
			"item_name" => item_name, 
			"venue_name" => venue_name, 
			"venue_website" => venue_website,

			# have to fill in manually :X
			"venue_address" => "",

			# lat/lng are filled in with another script
			"venue_geolat" => 0,
			"venue_geolng" => 0,

			# setting visited to false by default
			"visited" => false
		 }

		end
	end

        return JSON.pretty_generate(json_array)
end

json_2010 = get_items_for_bigeat(BIGEAT_2010_URL)
File.open('bigeats-2010.json', 'w') {|f| f.write(json_2010) }

json_2009 = get_items_for_bigeat(BIGEAT_2009_URL)
File.open('bigeats-2009.json', 'w') {|f| f.write(json_2009) }
