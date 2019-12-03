using System;

public class Response<T>
{ 
    private Response(){}

    public Response(T data)
    {
        this.Data = data;
        this.Error = null;
    }

    public Response(Exception ex)
    {
        this.Data = default(T);
        this.Error = ex.Message;
    }

    public T Data { get; set; }
    public string Error { get; set; }
}