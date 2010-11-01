require 'rubygems'

require 'open-uri'
require 'json'

GEOCODE_URL = "http://maps.googleapis.com/maps/api/geocode/json?address=%s&sensor=false"

def get_geo_data(bigeats_json)

	json_array = JSON.parse(bigeats_json)
	json_array.each do |item|
		address = item['venue_address']
		geo_lat, geo_lng = get_geo_for_address(address)
	
		item['venue_geolat'] = geo_lat
		item['venue_geolng'] = geo_lng
	end

	return JSON.pretty_generate(json_array)
end

def get_geo_for_address(address)
	return [0,0] if address.nil?
	
	escaped_address = URI.escape(address)
	geocode_json = open(GEOCODE_URL % escaped_address) { |f| JSON.parse(f.string) }
	
	lat = geocode_json['results'][0]['geometry']['location']['lat']
	lng = geocode_json['results'][0]['geometry']['location']['lng']

	puts "obtained coordinates: #{lat} #{lng}"
	
	return [lat.to_f, lng.to_f]
	
end


json_2010 = IO.read("bigeats-2010.json")
geocode_json_2010 = get_geo_data(json_2010)

File.open('bigeats-2010.json', 'w') {|f| f.write(geocode_json_2010) }
