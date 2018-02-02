package com.qun.api;

/**
 * Created by Qun on 2018/2/2.
 */
public class Testqun {
    public static void main(String[] args)
    {
        int result;

        result  =  foo();
        System.out.println(result);

    }


    public static int foo()
    {
        try{
        int a = 5 / 0;
    } catch (Exception e){
        return 1;
    } finally{
        return 2;
    }

    }
}
