   M S B A M L   `   `   `  ����I  EMyCoin_FontEnd, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null/clr-namespace:MyCoin_FontEndMyCoin_FontEnd  5   	   5clr-namespace:MyCoin_FontEnd.UCMyCoin_FontEnd.UC  5
   	       MyCoin_FontEnd.MainWindow   5   	   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5   	   R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   .localclr-namespace:MyCoin_FontEnd     5   	   c _System.Windows.Interactivity, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35Bi:http://schemas.microsoft.com/expression/2010/interactivity  5	   	   (ucclr-namespace:MyCoin_FontEnd.UC  5
   	   V RMaterialDesignThemes.Wpf, Version=3.1.3.1513, Culture=neutral, PublicKeyToken=nullFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes  5   	   -   5          �Name$  MainWd��5   	      MaterialDesignBody#���   5   	   $��Regular"�5   	   $��13(�5   	   &   System.Windows.Media.TextOptions   TextFormattingMode$ Ideal=�5   	      TextRenderingMode$
 Auto=�5   	     MaterialDesignPaper#���  5   	     MaterialDesignFont#���  5   	    � 
ResizeMode$ NoResize=�5   	    � WindowStyle$
 None=�5   	    � WindowStartupLocation$ CenterScreen=�5   	    � Title$ My Coin��5   	   $	��640��6   $
��1200��6&    
 MainVM � DataContext# [ 5   	   .  (System.Windows.Interactivity.Interaction   Triggers 5      /  )System.Windows.Interactivity.EventTrigger  5   
   	   	EventName$	 Closing��6   .  (System.Windows.Interactivity.TriggerBase
   Actions.
 5      6  0System.Windows.Interactivity.InvokeCommandAction     Command 6$   �� *CloseWindowCommand+5      .��5      ]� .+�5    
   � $	��Top=�6   .+�5!      $   MyCoin_FontEnd.UC.ControlBarUC  
 � Tag 6   ��  �� ElementName$ MainWd�� �� Path$ Title�5"      �� 5$   
   $	��Top=�6   $
��Left=�6&   +  %MaterialDesignThemes.Wpf.ButtonAssist   CornerRadius$ 0��5%        MaterialDesignRaisedButton#��[ 5&       �� 	IsDefault . ��5(      0  *MaterialDesignThemes.Wpf.PackIconExtension  *KeyboardBackspace+��5)      �� *BackToPrevScreenCmd+5*      � 5,   
   $��Stretch=�6   $��Stretch=�6-   .+�5-      �� ��6   �� *	CurrentUC+5.      5/      50      