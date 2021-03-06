module.exports = {
	
  set: function(obj, loc, val, options) {
		
    if(typeof obj !== "object" || typeof loc !== "string") return undefined
		
    var separator 	= "."
			, fields 	= loc.split(separator)
			, result 	= obj
	
    options	= options || {}

		if(typeof result !== "object") return undefined
		
		for (var i = 0, n = fields.length; i < n; i++) {
			var field = fields[i]
			
      if (i === n - 1) 
				options.unset ? delete result[field] : result[field] = val
			else {
				if (typeof result[field] === 'undefined' || typeof result[field] !== "object")
					result[field] = {}
			 
				result = result[field];
			}
		}
	}
  ,unset: function(obj, loc){
    return this.set(obj, loc, null,{unset:true})
  }
	,has: function(obj, loc) {
		return this.get(obj,loc,true)
	}
	,objToPaths: function(obj) {
		if(typeof obj !== "object") return {}
		var ret = {}
			, separator = "."

		for (var key in obj) {
			var val = obj[key];
			if (typeof val === "object") {
				var obj2 = this.objToPaths(val)
				for (var key2 in obj2) {
					ret[key + separator + key2] = obj2[key2]
				}
			}else 
				ret[key] = val
		}
		return ret
	}
	,pathsToObj: function(obj) {
		if(typeof obj !== "object") return {}
		var ret = {}

		for (var key in obj) 
			this.set(ret, key, obj[key])
		
		return ret
	}
	,get: function(obj, loc, return_exists) {
		if(typeof obj !== "object" || typeof loc !== "string") return undefined
		var separator = "."
			, fields = loc.split(separator)
			, result = obj

		if(typeof result !== "object") return undefined;

		return_exists || (return_exists = false)
		for(var i = 0, n = fields.length; i < n; i++) {
			if(return_exists && Object.keys(result).indexOf(fields[i]) == -1) return false
			
			result = result[fields[i]]
			if(result == null && i < n - 1) 
				result = {}
			
			if(typeof result === 'undefined'){
				if (return_exists) return true

				return result;
			}
		}
		if(return_exists) return true
		return result;
	}
}
