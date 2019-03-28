package edu.simpson.dewerff;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@WebServlet(name = "NameListEdit")
public class NameListEdit extends HttpServlet {
    private Pattern firstNameValidationPattern;
    private Pattern lastNameValidationPattern;
    private Pattern emailValidationPattern;
    private Pattern phoneValidationPattern;
    private Pattern birthDateValidationPattern;

    public NameListEdit() {
        firstNameValidationPattern = Pattern.compile("^[-A-Za-z'\u00C0-\u00FF]{1,45}$");
        lastNameValidationPattern = Pattern.compile("^[-A-Za-z'\u00C0-\u00FF]{1,45}$");
        emailValidationPattern = Pattern.compile("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$");
        phoneValidationPattern = Pattern.compile("^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$");
        birthDateValidationPattern = Pattern.compile("^\\d{4}-\\d{1,2}-\\d{1,2}$");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {

            response.setContentType("text/plain");
            PrintWriter out = response.getWriter();
            System.out.println("Hello1");

            // Just confirm we are calling the servlet we think we are
            System.out.println("JSON Post");

            // Open the request for reading. Read in each line, put it into a string.
            // Yes, I think there should be an easier way.
            java.io.BufferedReader in = request.getReader();
            String requestString = new String();
            for (String line; (line = in.readLine()) != null; requestString += line) ;

            // Output the string we got as a request, just as a check
            System.out.println(requestString);

            // Great! Now we want to use GSON to parse the object, and pop it into our business object. Field
            // names have to match. That's the magic.
            Gson gson = new Gson();
            Person fromJson = gson.fromJson(requestString, Person.class);

            int id = fromJson.getId();
            System.out.println(id);

            String first = request.getParameter("first");
            String last = request.getParameter("last");
            String email = request.getParameter("email");
            String phone = request.getParameter("phone");
            String birthday = request.getParameter("birthday");

            // Make sure our field was set.
            out.println("Object test: " + fromJson.getFirst() + fromJson.getLast() + fromJson.getEmail());
            Matcher firstNameMatch = firstNameValidationPattern.matcher(fromJson.getFirst());
            Matcher lastNameMatch = lastNameValidationPattern.matcher(fromJson.getLast());
            Matcher emailMatch = emailValidationPattern.matcher(fromJson.getEmail());
            Matcher phoneMatch = phoneValidationPattern.matcher(fromJson.getPhone());
            Matcher birthdayMatch = birthDateValidationPattern.matcher(fromJson.getBirthday());
            boolean valid = true;

            if (firstNameMatch.find( )) {
                out.println("Passed validation");
            } else {
                out.println("Did not pass validation");
                valid = false;
            }

            if (lastNameMatch.find( )) {
                out.println("Passed validation");
            } else {
                out.println("Did not pass validation");
                valid = false;
            }

            if (emailMatch.find( )) {
                out.println("Passed validation");
            } else {
                out.println("Did not pass validation");
                valid = false;
            }

            if (phoneMatch.find( )) {
                out.println("Passed validation");
            } else {
                out.println("Did not pass validation");
                valid = false;
            }

            if (birthdayMatch.find( )) {
                out.println("Passed validation");
            } else {
                out.println("Did not pass validation");
                valid = false;
            }

            out.println(valid);
            if (valid && id != 0){
                PersonDAO.editPeople(fromJson);
                PersonDAO.getPeople();
            } else if (valid){
                PersonDAO.addPeople(fromJson);
                PersonDAO.getPeople();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
