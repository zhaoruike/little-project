/**
 * Created by Administrator on 2016/7/19 0019.
 */
var arr=['sum','apple','huawei'];
var arr1=['4','5s','6plus'];
function getPrice(n,m) {
    return Math.round(Math.random()*(m-n)*1000+n)
}
var newArr=[]
for(var i=0;i<arr.length;i++){
    var obj={}
    obj.name=arr[i];
    obj.type=arr1;
    obj.price=getPrice(3,6)
    newArr.push(obj)
}
console.log(JSON.stringify(newArr))