export default function (data_new_roadtrip = {}, action) {
  if (action.type == "saveData") {
    var Updated_data_new_roadtrip = action.roadtripData;
    return Updated_data_new_roadtrip;
  } else if (action.type == "saveTitle") {
    var newData = { ...data_new_roadtrip, title: action.title };
    return newData;
  } else if (action.type == "clearData") {
    var newData = {};
    return newData;
  } else {
    return data_new_roadtrip;
  }
}
