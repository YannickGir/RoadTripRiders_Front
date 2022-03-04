export default function (data_new_roadtrip = {}, action) {
  if (action.type == "saveTitle") {
    var Updated_data_new_roadtrip = action.title;

    return Updated_data_new_roadtrip;
  } else {
    return data_new_roadtrip;
  }
}
