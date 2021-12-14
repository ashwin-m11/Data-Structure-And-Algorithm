// https://www.freecodecamp.org/news/demystifying-dynamic-programming-3efafb8d4296/

// bottomsUps
// We have an n×2 grid to be tiled.

//                <-------- n --------->
//                 -- -- -- -- -- -- --
//                |  |  |  |  |  |..|  |
//                 -- -- -- -- --    --
//                |  |  |  |  |  |..|  |
//                 -- -- -- -- -- -- --
// We have with us a supply of rectangular tiles of size 2×1. Each tile can be rotated and laid horizontally or vertically.

//                 -- --
//                |  |  |
//                 -- --
      
// How many ways can we tile the n×2 grid using these tiles?

const countTiling = (n) => {
    if(n <= 1) return 1;
    return countTiling(n-1) + countTiling(n-2)
}



// A more complicated tiling problem
// Again we want to tile an n×2 grid, but we have two types of tiles:

// A 2×1 tile as before
//        	    -- -- 
//        	   |  |  |
//        	    -- -- 
	 
// An L-shaped tile covering 3 squares
//             -- --
//            |  |  |
//             -- --
//               |  |
//                --
	 
// How many ways can we tile the n×2 grid using these tiles?

const countTiling1 = (n) => {
    if(n == 1) return 1;
    if(n == 2) return 2;

    return countTiling1(n-1)+ countTiling1(n-2) + 2*quarterTiling(n-2)
}

const quarterTiling = (n) => {
    if(n==1) return 1;
    return countTiling1(n-1) + quarterTiling(n-1)
}


console.log(countTiling(3));
console.log(countTiling1(3));
