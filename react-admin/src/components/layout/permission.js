export default function hasAuthority(permission, roles) {
  let result = false
  roles.forEach(ele=>{
    if(permission.includes(ele)) result=true
  })
  return result
}
