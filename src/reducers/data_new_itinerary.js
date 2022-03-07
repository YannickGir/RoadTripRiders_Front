export default function (data_new_itinerary = {}, action) {
  if (action.type == "saveItinerary") {
    var Updated_data_new_itinerary = action.itineraryData;
    return Updated_data_new_itinerary;
    // } else if (action.type == "saveDate") {
    //   var Updated_data_new_roadtrip = {
    //     ...data_new_roadtrip,
    //     title: action.date,
    //   };

    //   return Updated_data_new_roadtrip;
  } else {
    return data_new_itinerary;
  }
}
