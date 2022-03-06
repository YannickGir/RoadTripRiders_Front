export default function (data_new_roadtrip = {}, action) {
  if (action.type == "saveData") {
    var Updated_data_new_roadtrip = action.roadtripData;
    return Updated_data_new_roadtrip;
    // } else if (action.type == "saveDate") {
    //   var Updated_data_new_roadtrip = {
    //     ...data_new_roadtrip,
    //     title: action.date,
    //   };

    //   return Updated_data_new_roadtrip;
  } else {
    return data_new_roadtrip;
  }
}
