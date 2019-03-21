package edu.simpson.dewerff;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "NameListDelete")
public class NameListDelete extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {

            response.setContentType("text/plain");
            PrintWriter out = response.getWriter();
            System.out.print("Hello2");

            // Just confirm we are calling the servlet we think we are
            out.println("JSON Delete");

            java.io.BufferedReader in = request.getReader();
            String requestString = new String();
            for (String line; (line = in.readLine()) != null; requestString += line) ;

            out.println(requestString);

            Gson gson = new Gson();
            Person fromJson = gson.fromJson(requestString, Person.class);

            String id = request.getParameter("id");

            PersonDAO.deletePeople(fromJson);
            PersonDAO.getPeople();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
