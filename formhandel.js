<%@ page import="java.sql.*" %>

<%
    String waterLevel = request.getParameter("waterLevel");
    String propertyDamage = request.getParameter("propertyDamage");
    String cropDamage = request.getParameter("cropDamage");
    String livesLost = request.getParameter("livesLost");
    String foodShelter = request.getParameter("foodShelter");

    try {
        Class.forName("oracle.jdbc.driver.OracleDriver");
        
        Connection con = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:XE", "system", "manager");
        String sql = "INSERT INTO disaster_report (water_level, property_damage, crop_damage, lives_lost, food_shelter) VALUES (?, ?, ?, ?, ?)";

        PreparedStatement pst = con.prepareStatement(sql);
        
        pst.setString(1, waterLevel);
        pst.setDouble(2, Double.parseDouble(propertyDamage));
        pst.setDouble(3, Double.parseDouble(cropDamage));
        pst.setInt(4, Integer.parseInt(livesLost));
        pst.setString(5, foodShelter);

        pst.executeUpdate();

        con.commit();

        con.close();

        %>
        <script>alert('Disaster report submitted successfully');</script>
        <%
        RequestDispatcher rd = request.getRequestDispatcher("home.jsp");
        rd.forward(request, response);

    } catch (Exception e) {
        out.print(e);
    }
%>