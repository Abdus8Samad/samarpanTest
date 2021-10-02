const ResolveLevel = (score) =>{
    if(score < 0) return ["Headquarters", "rgba(255, 255, 255, "]
    else if(score < 200) return ["Novice", "rgba(40, 40, 40, "];
    else if(score < 500) return ["Talented", "rgba(0, 210, 63, "];
    else if(score < 900) return ["Proficient", "rgba(255, 128, 0, "];
    else if(score < 1200) return ["Expert", "rgba(127, 0, 255, "];
    else return ["Critic", "rgba(255, 0, 0, "];
}

export default ResolveLevel;