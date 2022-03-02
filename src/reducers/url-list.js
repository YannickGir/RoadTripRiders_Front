export default function (urlImgList = [], action) {
  if (action.type == 'saveUrl') {
    var NewImgList = [...urlImgList, action.url];

    return NewImgList;
  } else {
    return urlImgList;
  }
}
