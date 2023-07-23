namespace API.Errors
{
    public class ApiException
    {
        public ApiException(int statusCode, string message, string details)
        {
            StatusCode = statusCode;
            Message = message;
            Details = details;
        }

        //this class will have the response that we send to the client when there is an exception

        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}